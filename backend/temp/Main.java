public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to ByteLeep!");

        int[] arr = {1, 2, 3, 4, 5};
        
        System.out.println("Original Array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        
        // Calling the swapArray method to swap the array
        swapArray(arr);

        System.out.println("\nSwapped Array:");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }

    public static void swapArray(int[] arr) {
        int start = 0;
        int end = arr.length - 1;

        // Swap elements from start to end
        while (start < end) {
            // Swap the elements
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;

            start++;
            end--;
        }
    }
}
