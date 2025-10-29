-- Fix search path for update_order_status_timestamp function
CREATE OR REPLACE FUNCTION update_order_status_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_status IS DISTINCT FROM OLD.order_status THEN
    NEW.status_updated_at = now();
    
    -- Insert into history
    INSERT INTO public.order_status_history (order_id, status, changed_by)
    VALUES (NEW.id, NEW.order_status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;